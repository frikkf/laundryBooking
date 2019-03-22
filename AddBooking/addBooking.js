const { Datastore } = require('@google-cloud/datastore');
const cors = require('cors')();

//Validation
//Bruker kan kun opprette 1 booking frem i tid.

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const getUsersBookings = async (datastore, email) => {
  const query = datastore
    .createQuery('Booking')
    .filter('Email', email)
    .order('StartDate', { descending: true });
  const [bookings] = await datastore.runQuery(query);
  console.log("[Bookings]:",bookings);
  return bookings;
}

const validateBookings = async (datastore, email) => {
  const existingBookings = await getUsersBookings(datastore, email);
  console.log("[existingBookings]:",existingBookings);
  if(existingBookings.length > 0) {
    const startDate = new Date(existingBookings[0].StartDate);
    console.log("[Validating bookings]", startDate, new Date(), startDate > new Date());
    if(startDate > new Date()) throw Error("User can only create one booking ahead in time");
  }
}

exports.addBooking = (req, res) => {
  cors(req, res, async () => {
    try {
      const { name, startDate, endDate, comment, email } = req.body;
      const projectId = 'hovseterveien96vasketider';
      const datastore = new Datastore({
        projectId: projectId,
      });
      
      try{
        await validateBookings(datastore, email);
      }catch(e) {
        return res.status(403).send("Not allowed to create booking");
      }

      // The kind for the new entity
      const kind = 'Booking';
      // The name/ID for the new entity
      // The Cloud Datastore key for the new entity
      const key = datastore.key([kind]);

      
      const booking = {
        key: key,
        data: [
          {
            name: 'StartDate',
            value: new Date(startDate).toJSON(),
          },
          {
            name: 'EndDate',
            value: new Date(endDate).toJSON(),
          },
          {
            name: 'Name',
            value: name,
          },
          {
            name: 'Email',
            value: email,
          },
          {
            name: 'Comment',
            value: comment
          }
        ],
      };

      await datastore.save(booking);
      const createdBooking = await datastore.get(key);
      console.log(createdBooking);
      res.status(200).json({booking: createdBooking[0]});
    } catch (e) {
      console.error("Failed to create booking", e);
      res.status(500).send(`Failed to create booking ${e}`);
    }
  });

};
