import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";

const ArticlePage = () => {
    const { articleId } = useParams();
    const article = articles.find(a => a.name === articleId);

    if (!article) return <NotFoundPage />;

    return (
        <div>
            <>
                <h1>{article.title}</h1>
                {
                    article.content.map((p, i) => (<p key={i}>{p}</p>))
                }
            </>
        </div>
    );
};

export default ArticlePage;