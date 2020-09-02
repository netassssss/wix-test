const { path } = require('../../consts/firebase');
const { parseReqArguments, asyncForeach } = require('../../utils/dbHelper');
const getTree = require('./get-tree');

const setDocumentInDb = async (firebase, data) => {
  const documentName = data.documentId;

  const categoryRef = firebase.collection(path).doc(documentName);

  await categoryRef.update({ current: data.current });
};

module.exports = async(args) => {
  const { firebase, req } = parseReqArguments(args);
  const { node, fromNode } = req.body;
  try {
    await asyncForeach(update, async (data) => {
      await setDocumentInDb(firebase, data);
    });
  } catch (e) {
    console.log('error on update', e);
  }
  getTree(args);
};
