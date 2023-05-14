const ErrorPage = ({ message }: ErrorPageProps) => {
  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};

interface ErrorPageProps {
  message: string;
}

export default ErrorPage;
