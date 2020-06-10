import React from "react";
import "./articleDetails.css";
import { getSlugArticle, deleteArticleData } from '../../../store/actions/articleActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { postCommentData, getCommentData, getDeleteData } from '../../../store/actions/commentActions';
import { getUserFeed, getGlobalFeed, getTagList } from '../../../store/actions/articleActions';

const username = localStorage.getItem('UserName');
class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    }
    this.publishComment = this.publishComment.bind(this);
    this.onChangeCommentValue = this.onChangeCommentValue.bind(this);
  }

  componentDidMount() {
    const { getSlugArticle, getComment, getCommentData } = this.props;
    getSlugArticle({ slug: this.props.match.params.slug });
    getCommentData({ slug: this.props.match.params.slug });

  }

  editSelectedArticle() {
    this.props.history.push(`/article/${this.props.match.params.slug}`);
  }

  deleteSelectedArticle() {
    const { deleteArticleData, getUserFeed, getGlobalFeed, getTagList } = this.props;
    deleteArticleData({ slug: this.props.match.params.slug });
    getUserFeed({ limit: 10, offset: 0 })
    getGlobalFeed({ limit: 10, offset: 0 });
    getTagList();
    this.props.history.push('/');
  }

  onChangeCommentValue = (event, name) => {
    const { value } = event.target;
    this.setState({ [name]: value });
  }

  publishComment = (event) => {
    const { postCommentData, PostComment } = this.props;
    event.preventDefault();
    if (this.state.comment) {
      let body = {
        comment: {
          "body": this.state.comment
        }
      }
      if (body) {
        postCommentData({ slug: this.props.match.params.slug, comment: body }).then(response => {
          const { getCommentData } = this.props;
          this.setState({
            comment: ''
          });
          getCommentData({ slug: this.props.match.params.slug });
        }).catch(error => {
          console.log(error);
        });;
      }
    }
  }

  favouriteTabClick = () => {
    console.log('favourite')
  }

  followBtnClick = () => {
    console.log('followBtnClick')
  }

  deleteComment(id) {
    const { getDeleteData, getCommentData } = this.props;
    getDeleteData({ slug: this.props.match.params.slug, id: id }).then(() => {
      getCommentData({ slug: this.props.match.params.slug });
    });
  }

  render() {
    let flagFollow = false;
    const { SlugArticles, getComment } = this.props;
    if (SlugArticles && SlugArticles.author?.username && username) {
      if (username == SlugArticles.author.username) {
        flagFollow = true;
      }
    }
    return (
      <div className="details-container">
        <div className="details-container">
          <div className="detail-top-banner">
            <div className="detail-top-title">{SlugArticles.title}</div>
            <div className="detail-user-info">
              <div className="avtar-img-detail">
                <Link to={`/username/${SlugArticles.author?.username}`}> <img
                  alt=""
                  className="avtar-img"
                  height="32px"
                  width="32px"
                  src={SlugArticles.author?.image}
                /></Link>
                <div className="detail-username">
                  <Link to={`/username/${SlugArticles.author?.username}`}>{SlugArticles.author?.username}</Link>
                  <span>{new Date(SlugArticles.createdAt).toDateString()}</span>
                </div>
                {flagFollow ? (<>
                  <button className="btn btn-outline-secondary btn-sm" href="" onClick={() => this.editSelectedArticle()}>
                    Edit Article
                 </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => this.deleteSelectedArticle()}>
                    Delete Article
                 </button>
                </>
                ) : (
                    <>
                      <button className="btn btn-outline-secondary btn-sm" href="" onClick={() => this.followBtnClick()}>
                        Follow {SlugArticles.author?.username}
                      </button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => this.favouriteTabClick()}>
                        Favourite
                 </button>
                    </>
                  )}

              </div>
            </div>
          </div>
          <div className="detail-item-container">
            <div className="title-desc">
              <div className="detail-title">{this.props?.SlugArticles.body}</div>
            </div>
            <div className="deatil-post-container">
              <div className="avtar-img-post">
                <Link to={`/username/${SlugArticles.author?.username}`}> <img
                  alt=""
                  className="avtar-img"
                  height="32px"
                  width="32px"
                  src={SlugArticles.author?.image}
                /></Link>
                <div className="detail-username green-color">
                  <Link to={`/username/${SlugArticles.author?.username}`}>{SlugArticles.author?.username}</Link>
                  <span>{new Date(SlugArticles.createdAt).toDateString()}</span>
                </div>
                {flagFollow ? (<>
                  <button className="btn btn-outline-secondary btn-sm" href="" onClick={() => this.editSelectedArticle()}>
                    Edit Article
                 </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => this.deleteSelectedArticle()}>
                    Delete Article
                 </button>
                </>
                ) : (
                    <>
                      <button className="btn btn-outline-secondary btn-sm" href="" onClick={() => this.followBtnClick()}>
                        Follow {SlugArticles.author?.username}
                      </button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => this.favouriteTabClick()}>
                        Favourite
                 </button>
                    </>
                  )}
              </div>
              {username ? (
                <>
                  <form className="comment comment-form" onSubmit={this.publishComment}>
                    <div className="comment-block">
                      <textarea className="form-control-textarea" name="comment" value={this.state.comment} placeholder="Write a comment..." rows="8" onChange={event => this.onChangeCommentValue(event, 'comment')}></textarea>
                    </div>
                    <div className="comment-footer">
                      <img alt='' className="comment-author-img" />
                      <button className="btn btn-sm btn-primary" type="submit">
                        Post Comment
                  </button>
                    </div>
                  </form>
                </>
              ) : (<></>)}
              {(getComment && getComment.length > 0) && getComment.map((comment, i) => {
                return (
                  <div className="comment" key={i}>
                    <div className="comment-block">
                      <p className="comment-text">{comment.body}</p>
                    </div>
                    <div className="comment-footer">
                      <a className="comment-author" href="#/">
                        <img alt="" src={comment.author?.image} className="comment-author-img" />
                      </a>
                  &nbsp;
                  <a className="comment-author" href="">{comment.author?.username}</a>
                      <span className="date-posted" >{new Date(comment.createdAt).toDateString()}</span>
                      <button className="delete-button" onClick={() => this.deleteComment(comment.id)}>Delete</button>
                    </div>
                  </div>
                )
              })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//This deals with Redux store’s stateProps
const mapStateToProps = (state) => {
  return {
    SlugArticles: state.Articles.slugArticles,
    deleteArticle: state.Articles.deleteArticle,
    PostComment: state.CommentData.postComment,
    getComment: state.CommentData.comment,
  };
};
//This deals with Redux store’s dispatchProps 
const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators({
    getSlugArticle,
    deleteArticleData,
    postCommentData,
    getCommentData,
    getUserFeed,
    getGlobalFeed,
    getTagList,
    getDeleteData
  },
    dispatch),
});
//connect : This function connects a React component to a Redux store.
//withRouter : It connects component to the router.
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Details));
