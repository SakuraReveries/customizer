import { useProgress } from '@react-three/drei';
import { ProgressBar } from 'react-bootstrap';

export default function Loader() {
  const { progress } = useProgress();

  return (
    <div className="d-flex w-100 h-100 justify-content-center align-items-center bg-secondary">
      <h1 className="display-1 text-light sr-loader-heading">
        <p>Loading&hellip;</p>
        <ProgressBar now={progress} max={100} min={0} className="my-4" />
      </h1>
    </div>
  );
}
