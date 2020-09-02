const { path } = require('../../consts/firebase');
const { parseReqArguments, asyncForeach } = require('../../utils/dbHelper');
const getTree = require('./get-tree');

const deleteDocument = async (firebase, documentId) => {
  const catRef = firebase.collection(path).doc(documentId);
  const doc = await catRef.get();
  doc.ref.delete();
};

module.exports = async (args) => {
  const { firebase, req } = parseReqArguments(args);
  const { documentIds } = req.body;
  try {
    await asyncForeach(documentIds, async (id) => {
      await deleteDocument(firebase, id);
    });
  } catch (e) {
    console.log('error in deleting data', e);
  }
  getTree(args);
};
