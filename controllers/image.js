const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");
const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${process.env.API_CLARIFAI}`);
    
const handleApiCall = (req, res) => {
    const { input } = req.body;

    stub.PostModelOutputs(
        {
            // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
            model_id: "face-detection",
            inputs: [{data: {image: {url: input}}}]
        },
        metadata,
        (err, response) => {
            if (err) {
                console.log("Error: " + err);
                return;
            }
    
            if (response.status.code !== 10000) {
                console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
                return;
            }
    
            console.log("Predicted concepts, with confidence values:")
            for (const c of response.outputs[0].data.concepts) {
                console.log(c.name + ": " + c.value);
            }
            res.json(response)
        }
    );
    }
    
const handleImage = (req,res, db) => {

    const { id } = req.body;

    db('users').where("id", "=", id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0].entries))
    .catch(err => res.status(400).json("an error has occured."))

}

module.exports = {

 handleApiCall: handleApiCall,
 handleImage: handleImage
 

};