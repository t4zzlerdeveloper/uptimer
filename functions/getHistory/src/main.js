import { Client, Query,Databases,ID} from 'node-appwrite';

const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
.setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

async function getDoc(id,res,log){
  let promise = await databases.getDocument(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_COLLECTION_ID,
    id
  )

  if(promise){
    log(promise);
    return res.json(promise);
  }
  else{
    return res.json({
      "success": false,
      "error":"An error ocurred while trying to retreive the history of the provided url."
    });
  }
}

async function createDoc(url,res,log){

  let promise = await databases.createDocument(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_COLLECTION_ID,
    ID.unique(),
    {url:url}
  )

  if(promise){
    log(promise);
    return res.json(promise);
  }
  else{
    return res.json({
      "success": false,
      "error":"An error ocurred while trying to retreive the history of the provided url."
    });
  }

}


export default async ({ req, res, log, error }) => {


  if (req.method === 'GET') {

    const url = req.query.url;

    let promise = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      [Query.equal("url", [url])]
    );

      if(promise){
        if(promise.total == 1){
          return await getDoc(promise.documents[0].$id,res,log);
        }
        else{
          return await createDoc(url,res,log);
        }
      }
      else{
        return res.json({
          "success": false,
          "error":"An error ocurred while trying to retreive the history of the provided url."
        });
      }
    

    return res.send('Hello, World!');
  }

  return res.json({
    motto: 'Build like a team of hundreds_',
    learn: 'https://appwrite.io/docs',
    connect: 'https://appwrite.io/discord',
    getInspired: 'https://builtwith.appwrite.io',
  });
};
