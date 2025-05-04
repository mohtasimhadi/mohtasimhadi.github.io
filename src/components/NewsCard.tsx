interface NewsProps {
  date: string;
  news: string;
}

const NewsCard: React.FC<NewsProps> = ({ date, news }) => {
  return (
    <div className="bg-white border-1 rounded p-6 border-l-4 border-gray-900">
      <p className="text-sm text-gray-500">{date}</p>
      <p
        className="text-lg mt-2 news-content"
        dangerouslySetInnerHTML={{ __html: news }}
      />
    </div>
  );
};

export default NewsCard;
