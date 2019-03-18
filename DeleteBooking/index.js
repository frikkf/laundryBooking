const { Datastore } = require('@google-cloud/datastore');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

exports.deleteBooking = async (req, res) => {
  try {
    const bookingId = req.query.id;
    console.log('Trying to delete booking with id: ', bookingId);
    const projectId = 'hovseterveien96vasketider';
    const datastore = new Datastore({
      projectId: projectId,
    });

    const bookingKey = datastore.key(['Booking', bookingId]);

    await datastore.delete(bookingKey);
    
    res.status(200).send(`Booking with id: ${bookingId} was successfully deleted`);

  } catch (e) {
    console.error("Failed to delete booking", e);
    res.status(500).send(`Failed to delete booking ${e}`);
  }


};
