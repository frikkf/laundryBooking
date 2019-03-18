const { Datastore } = require('@google-cloud/datastore');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

exports.addBooking = async (req, res) => {
  try {
    const { user, startDate, endDate, comment } = req.body;
    const projectId = 'hovseterveien96vasketider';
    const datastore = new Datastore({
      projectId: projectId,
    });

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
          name: 'User',
          value: user,
        },
        {
          name: 'Comment',
          value: comment
        }
      ],
    };
    const response = await datastore.save(booking);
    console.log(response);
    res.status(200).send(`Booking ${key.id} created successfully.`);
  } catch (e) {
    console.error("Failed to create booking", e);
    res.status(500).send(`Failed to create booking ${e}`);
  }


};
