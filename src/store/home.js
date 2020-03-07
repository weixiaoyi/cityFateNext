import { observable } from 'mobx';
import Extend from './storeExtend';
//import { getUserArticles, addUserArticle } from '../service';
//import { resOk } from '../utils';
class HomeStore extends Extend {
  constructor(props) {
    super(props);
  }

  @observable userArticlesPage = 1;
  @observable userArticles = [];

  reload = () => {
    //this.getUserArticles();
  };

  getUserArticles = async ()=>{

  }

  // getUserArticles = async () => {
  //   // const res = await getUserArticles({
  //   //   page: this.userArticlesPage,
  //   //   pageSize: 10
  //   // });
  //   // if (resOk(res)) {
  //   //   const data = res.result.data;
  //   //   console.log(res, '---data');
  //   //   this.changeModel('userArticles', data);
  //   //   return data;
  //   // }
  // };
  //
  // addUserArticle = async ({ title, content }) => {
  //   // const res = await addUserArticle({
  //   //   title,
  //   //   content
  //   // });
  //   // if (resOk(res)) {
  //   //   this.reload();
  //   // }
  // };
}

export default HomeStore;
