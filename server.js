import express from 'express';
import dotenv from 'dotenv';
import stripe from 'stripe';

// load vars

dotenv.config();



//Start Server
const app = express();

app.use(express.static('public'));
app.use(express.json());


//Home Route

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: "public"});
});

//Success
app.get('/success', (req, res) => {
    res.sendFile('success.html', { root: "public"});
});

//Cancel
app.get('/cancel', (req, res) => {
    res.sendFile('cancel.html', { root: "public"});
});


// Stripe
let stripeGateway = stripe(process.env.stripe_api);
let DOMAIN = process.env.DOMAIN;

app.post('/stripe-checkout', async (req, res) => {
    const lineItems = req.body.items.map((item) => {
        const unitAmount = parseInt(item.price.replace(/[^0-9.-]+/g, '') * 100);
        console.log('item-price: ', item.price);
        console.log('uniAmount: ', unitAmount);
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.title,
                    images: [item.productImg]
                },
                unit_amount: unitAmount,
            },
            quantity: item.quantity,

            price_data: {
              currency: 'usd',
              product_data: {
                  name: "shipping cost",
                  images: "https://static.vecteezy.com/system/resources/thumbnails/002/206/240/small/fast-delivery-icon-free-vector.jpg"
              },
              unit_amount: 450,
          },
          quantity: 1,

        }
        
    });

  //   const shipping = req.body.items.map((item) => {
  //     const unitAmount = parseInt(item.price.replace(/[^0-9.-]+/g, '') * 100);
  //     console.log('item-price: ', item.price);
  //     console.log('uniAmount: ', unitAmount);
  //     return {
  //         price_data: {
  //             currency: 'usd',
  //             product_data: {
  //                 name: "shipping cost",
  //                 images: "https://static.vecteezy.com/system/resources/thumbnails/002/206/240/small/fast-delivery-icon-free-vector.jpg"
  //             },
  //             unit_amount: 450,
  //         },
  //         quantity: 1,

          

  //     }
      
  // });
    console.log('lineItems: ', lineItems);

    // Create Checkout Session
    const session = await stripeGateway.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${DOMAIN}/success`,
        cancel_url: `${DOMAIN}/cancel`,
        line_items: lineItems ,
        custom_fields: [
            {
              key: 'color',
              label: {
                type: 'custom',
                custom: 'Main Color',
              },
              optional: false,
              type: 'dropdown',
              dropdown: {
                options: [
                  {
                    label: 'White',
                    value: 'white',
                  },
                  {
                    label: 'Black',
                    value: 'black',
                  },
                  {
                    label: 'Red',
                    value: 'red',
                  },
                  {
                    label: 'Orange',
                    value: 'orange',
                  },
                  {
                    label: 'Yellow',
                    value: 'yellow',
                  },
                  {
                    label: 'Green',
                    value: 'green',
                  },
                  {
                    label: 'Light Green',
                    value: 'lime',
                  },
                  {
                    label: 'Blue',
                    value: 'blue',
                  },
                  {
                    label: 'Light Blue',
                    value: 'lightblue',
                  },
                  {
                    label: 'Purple',
                    value: 'purple',
                  },
                  {
                    label: 'Gray',
                    value: 'gray',
                  },
                  {
                    label: 'Silver',
                    value: 'silver',
                  },
                  {
                    label: 'Light Brown',
                    value: 'brown',
                  },
                ],
              },
            },
          ],
        // Asking address in stripe checkout
        billing_address_collection: 'required'
    });
    res.json(session.url);

});


app.listen(3000, () => {
    console.log('listening on port 3000;');
});