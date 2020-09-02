const { path } = require('../../consts/firebase');
const { parseReqArguments, generateDocumentName } = require('../../utils/dbHelper');
const getTree = require('./get-tree');

const setDocumentInDb = async (firebase, data, insert) => {
  const documentName = insert
    ? generateDocumentName(Math.floor(Math.random() * 100))
    : data.documentId;

  const nodeData = { ...data, documentId: documentName };
  const categoryRef = firebase.collection(path).doc(documentName);

  const funcName = insert ? 'set' : 'update';
  await categoryRef[funcName](nodeData, { merge: true });
};

module.exports = async (args) => {
  const { firebase, res, req } = parseReqArguments(args);
  const { insert, update } = req.body;

  try {
    await setDocumentInDb(firebase, insert, true);
    await setDocumentInDb(firebase, update, false);
  } catch (e) {
    throw new Error(e);
  }

  getTree(args);
};
