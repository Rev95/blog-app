import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm"

const ArticlePage = () => {
    const { articleId } = useParams();
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

    useEffect(() => {
        axios.get(`/api/articles/${articleId}`)
            .then(response => setArticleInfo(response.data))
    }, []);

    const article = articles.find(a => a.name === articleId);

    const addUpvote = () => {
        axios.put(`/api/articles/${articleId}/upvote`)
            .then(response => setArticleInfo(response.data));
    };

    if (!article) return <NotFoundPage />;

    return (
        <div>
            <>
                <h1>{article.title}</h1>
                <div className="upvotes-section">
                    <button onClick={addUpvote}>Upvote</button>
                    <p> This article has {articleInfo.upvotes} upvotes</p>
                </div>
                {
                    article.content.map((p, i) => (<p key={i}>{p}</p>))
                }
                <AddCommentForm articleName={articleId} setArticleInfo={setArticleInfo}/>
                <CommentsList comments={articleInfo.comments} />
            </>
        </div>
    );
};

export default ArticlePage;