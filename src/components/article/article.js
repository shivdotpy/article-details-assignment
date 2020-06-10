// import React from 'react';
// import axios from "axios";

// class Article extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       articles: ''
//     }
//     this.getArticle = this.getArticle.bind();
//   }
//   getArticle = () => {
//     axios.get('https://conduit.productionready.io/api/articles').then(response => {
//       console.log(response.data.articles);
//       const articles = response && response.data && response.data.articles &&
//         response.data.articles.map((art, index) =>
//           <div key={index}>
//             <article>
//               <h3><a href={`/post/${art.slug}`}>{art.title}</a></h3>
//             </article>
//           </div>
//         )
//       this.setState({ articles: articles })

//     }).catch(error => {
//       console.log("Something went wrong. Please try again later.");
//     });
//   }

//   componentWillMount() {
//     this.getArticle();
//   }

//   render() {
//     return (
//       <div>
//         {this.state.articles}
//       </div>
//     );
//   }

// }

// export default Article;