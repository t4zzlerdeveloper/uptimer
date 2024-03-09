import { Client } from 'node-appwrite';

import https from 'https';
import http from 'http';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);


function checkWebsite(url, callback) {

  const client = url.startsWith("https://") ? https : http
  
    client
      .get(url, function(res) {
        console.log(url, res.statusCode);
        return callback(res.statusCode);
      })
      .on("error", function(e) {
        return callback(undefined);
      });
}

function handleDocs(docs){
  docs.map((doc)=>{
    checkWebsite(doc.url, function(check){

      let newHistory = JSON.parse(doc.history);
      newHistory.unshift({
        "time": Date.now(),
        "code": check,
        "online": check ? true : false
      });


      const promise = databases.updateDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_COLLECTION_ID,
        doc.$id,
        {
          history:JSON.stringify(newHistory)
        }
      );

      promise.then(()=>{
        console.log("Sucessfully updated history for URL: " + doc.url)
      })
      .catch(()=>{
        console.log("Error updating history for URL: " + doc.url)
      })

    })
  });
}


export default async ({ req, res, log, error }) => {
  
  
     if (req.method === 'GET') {

      let promise = databases.listDocuments(
       process.env.APPWRITE_DATABASE_ID,
       process.env.APPWRITE_COLLECTION_ID
      );
 
      promise.then((docs)=>{
       handleDocs(docs)
      })
      .catch((err)=>{
       console.log(err)
      })

  }

};
