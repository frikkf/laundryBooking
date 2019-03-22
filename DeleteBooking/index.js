const { Datastore } = require('@google-cloud/datastore');
const cors = require('cors')();


/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

exports.deleteBooking = (req, res) => {
  cors(req, res, async () => {

    try {
      const bookingId = req.query.id;
      const email = req.query.email;
      if(!bookingId || !email) return res.status(400).send('Missing parameters');
      console.log('Trying to delete booking with id: ', bookingId);
      const projectId = 'hovseterveien96vasketider';
      const datastore = new Datastore({
        projectId: projectId,
      });

      const bookingKey = datastore.key(['Booking', datastore.int(bookingId)]);
      console.log("Bookingkey",bookingKey);
      const foundBooking = await datastore.get([bookingKey]);
      if(foundBooking === null || foundBooking.length === 0) return res.status(400).send('Not allowed to delete this booking');
      console.log(foundBooking);
      const booking = foundBooking[0][0];

      if(booking.Email !== email) return res.status(403).send('Forbidden to delete anothers booking');

      await datastore.delete(bookingKey);

      res.status(200).send(`Booking with id: ${bookingId} was successfully deleted`);

    } catch (e) {
      console.error("Failed to delete booking", e);
      res.status(500).send(`Failed to delete booking ${e}`);
    }
  });

};
