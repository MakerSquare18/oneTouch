# oneTouch

## Description

oneTouch is a marketplace that enables any merchant to provide their customers with one-touch payments on the Apple Watch. oneTouch was built in 24 hours for the 2015 Money2020 hackathon in Las Vegas by:

1. Richard Artoul
2. Brendan Dugan
3. David Goldberg
4. Ian Zhang

All oneTouch financial transactions are powered by Paypal.

## Stack

oneTouch was built using Angular on the front-end, and Node.js on the back-end. The Apple Watch application was written in Swift.

## How it works

### Web Application

A merchant signs up with the oneTouch service, and then they can use the merchant dashboard to specify which products they would like to offer for sale using oneTouch.

![](http://g.recordit.co/MjSnqkfIej.gif)

Similarly, customers sign up with oneTouch and specify a credit card that they would like their oneTouch purchases to be charged to. The customer's credit cards are stored securely using PayPal's vault service.

Once a user has made an account, they are presented with the user dashboard where they can select which products they would like to be available to purchase on their Apple Watch with oneTouch.

![](http://g.recordit.co/FEuWehcUhl.gif)

### Apple Watch Application

When a user opens the oneTouch application on their Apple Watch, they are presented with a list of all their favorite product which they can purchase by force-pressing the screen.

![](http://g.recordit.co/acBQJ0RaFS.gif)

**Note**: A mouse cursor appear in that gif because the Apple Watch application is running in a simulator.

oneTouch also supports geo-specific purchases, so the watch application will also populate the list with products that are available for purchase within a small radius of the user's location. For example, in the gif above all the coffee-related items are appearing on the watch because the used added them to his preferences list, but the hot dog and nachos options are appearing due to the users location.






