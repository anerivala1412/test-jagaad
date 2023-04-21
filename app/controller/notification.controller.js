const db = require("../models");
const Notification = db.Notification;
const User = db.User;
const { ObjectId } = require("mongodb");
const sgMail = require('@sendgrid/mail') //sendGride API

exports.addNotification = async(req, res) => {
const notification = new Notification({
    user: new ObjectId(req.userId),
    email: req.body.email,
    notifications: req.body.notifications
});

notification.save((err, notification) => {
            if (err) {
                res.status(500).send({ message: err.message });
                return
            }
            sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            const msg = {
                    to: req.body.email,
                    from: process.env.MAIL_ACCOUNT,
                    subject: 'Sending with SendGrid is Fun',
                    text: 'and easy to do anywhere, even with Node.js',
                    html: `<!DOCTYPE html>
                    <html>
                    <head>
                      <meta charset="utf-8">
                      <title>New Notifications</title>
                    </head>
                    <body>
                      <h1>New Notifications</h1>
                      <ul>
                        ${req.body.notifications.map(notification => `<li>${notification}</li>`).join('')}
                      </ul>
                    </body>
                    </html>`
                  }
                  sgMail
                    .send(msg)
                    .then(() => {
                      return res.status(200).send({
                          message: "email sent"
                        }) 
                    })
                    .catch((error) => {
                      return res.status(500).send({
                          message: error
                        }) 
                    })
              });
    
 
};

exports.getNotificationList = async (req,res)=>{
    try {
      let query = []
      query.push({ $match: { user: new ObjectId(req.userId) } });
      query.push({ "$sort": { "order": -1 } })
      const items = await Notification.aggregate(query);
      return res.status(200).send({
          items,
          total: items.length
      });   
    } catch (error) {
        return res.status(500).send({
            message: error.message
         })
    }
};