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

const isUpcomingBooking = (booking) => new Date(booking.StartDate) > new Date()

const failResponse = () => ({booking: null, isUpcoming: false});
const successResponse = (booking) => ({booking: booking, isUpcoming: true});

exports.getUpcomingBooking = (req, res) => {
  cors(req, res, async () => {
    try {
      const createdBy = req.query.createdBy;
      console.log("Getting upcoming booking for ", createdBy);
      const projectId = 'hovseterveien96vasketider';
      const datastore = new Datastore({
        projectId: projectId,
      });

      const query = datastore.createQuery('Booking').filter('CreatedBy', createdBy).order('StartDate', { descending: true});
      const [bookings] = await datastore.runQuery(query);
      if(bookings.length > 0) {
        const booking = bookings[0];
        const id = booking[datastore.KEY].id;
        isUpcomingBooking(booking) ? 
            res.status(200).json(successResponse({...booking, id: id}))
          : res.status(200).json(failResponse())
      }else {
        res.status(200).json(failResponse());
      }
    } catch (e) {
      console.error("Failed to get upcoming booking", e);
      res.status(500).send(`Failed to get upcoming booking ${e}`);
    }
  });

};
