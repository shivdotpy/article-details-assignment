// import React from 'react';

// const ArticlePreview = props => {
//     const article = props.article;
//     if (!props.articles) {
//         return (
//             <div>Loading...</div>
//         );
//     }

//     if (props.articles.length === 0) {
//         return (
//             <div>
//                 No articles live here yet.
//             </div>
//         );
//     }

//     return (
//         <div>
//             <div >
//                 <a>
//                     <img src={article.author.image} />
//                 </a>
//                 <div >
//                     <a >
//                         {article.author.username}
//                     </a>
//                     <span >
//                         {new Date(article.createdAt).toDateString()}
//                     </span>
//                 </div>
//                 <div >
//                     <button>
//                         <i></i> {article.favoritesCount}
//                     </button>
//                 </div>
//             </div>

//             <a href="/">
//                 <h1>{article.title}</h1>
//                 <p>{article.description}</p>
//                 <span>Read more...</span>
//                 <ul >
//                     {
//                         article.tagList.map(tag => {
//                             return (
//                                 <li key={tag}>
//                                     {tag}
//                                 </li>
//                             );
//                         })
//                     }
//                 </ul>
//             </a>

//         </div>
//     );
// };

// export default ArticlePreview;