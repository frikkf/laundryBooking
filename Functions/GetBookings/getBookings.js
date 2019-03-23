const { Datastore } = require('@google-cloud/datastore');
const cors = require('cors')();

//Småfikser
//Gi kun bookings 30 dager frem i tid.


/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

exports.getBookings = (req, res) => {
  cors(req, res, async () => {

    try {
      const projectId = 'hovseterveien96vasketider';
      const datastore = new Datastore({
        projectId: projectId,
      });

      const query = datastore.createQuery('Booking').order('StartDate');

      const [bookings] = await datastore.runQuery(query);

      const bookingsWithId = bookings.map(b => ({ ...b, id: b[datastore.KEY].id }));

      res.status(200).json({ bookings: bookingsWithId });

    } catch (e) {
      console.error("Failed to list bookings", e);
      res.status(500).send(`Failed to list bookings ${e}`);
    }
  });

};
