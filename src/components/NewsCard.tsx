interface NewsProps {
  date: string;
  news: string;
}

const NewsCard: React.FC<NewsProps> = ({ date, news }) => {
  return (
    <div className="p-6 pt-2 pb-2 border-b-1">
      <p className="text-sm text-gray-500">{date}</p>
      <p
        className="text-lg mt-2 news-content"
        dangerouslySetInnerHTML={{ __html: news }}
      />
    </div>
  );
};

export default NewsCard;
