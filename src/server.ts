import express, { Router, Request, Response, response } from "express";
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
   
    app.get("/", async (req, res) => {
      res.send("Welcome to UDAGRAM Inc. Use the GET PATH to continue *GET PATH: //try GET url/filteredimage?image_url={{}}");  
  });

  app.get("/filteredimage/", (req: Request, res: Response) => {
          let { image_url } = req.query;
         
          if (!image_url) {
          return res.status(400).json
          ({
            status_code: 0,
            error_msg: "Kindly input the image URL",
          });
           }

           else{
          filterImageFromURL(image_url).then((response) => {
              res.sendFile(response);
              res.on("done", function () {
                  deleteLocalFiles([response]);
                  res.status(200).json
                  ({
                    status_code: 1,
                    error_msg: "Image successfully retrieved",
                  });
                  
                  
              });
          });
      }
  });

  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();