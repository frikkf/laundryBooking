const { Datastore } = require('@google-cloud/datastore');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

exports.getBookings = async (req, res) => {
  res.set('Access-Control-Allow-Origin', "localhost, admin.norahelmer.no");
  res.set('Access-Control-Allow-Methods', 'GET');

  try {
    const projectId = 'hovseterveien96vasketider';
    const datastore = new Datastore({
      projectId: projectId,
    });

    const query = datastore.createQuery('Booking').order('StartDate');

    const [bookings] = await datastore.runQuery(query);

    const bookingsWithId = bookings.map(b => ({...b, id: b[datastore.KEY].id}));

    res.status(200).json({bookings:bookingsWithId});

  } catch (e) {
    console.error("Failed to list bookings", e);
    res.status(500).send(`Failed to list bookings ${e}`);
  }


};
