import { Http } from 'vue-resource';

const SERVER_API = 'http://localhost:3000';

export default class {
  static getTree() {
    return Http.get(`${SERVER_API}/api/get-tree`);
  }

  static addNode({ insert, update }) {
    return Http.post(`${SERVER_API}/api/add-node`, { insert, update });
  }
}
