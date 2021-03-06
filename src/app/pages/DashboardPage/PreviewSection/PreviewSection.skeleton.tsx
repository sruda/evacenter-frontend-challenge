/* --- DEPENDENCIES --- */
import React from 'react';
import cn from 'classnames';
/* -------------------- */

type Props = {
  readonly className?: string;
};

const PreviewSectionSkeleton: React.FC<Props> = ({ className }) => {
  /*------------------*/
  /* CLASS ASSIGNMENT */
  /*------------------*/
  const previewSectionSkeletonClass = cn(
    className,
    'preview-section-skeleton flex items-center justify-center rounded-lg bg-white shadow overflow-hidden h-96',
  );

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <div className={previewSectionSkeletonClass}>
      <div className="flex items-center justify-center">
        <svg
          className="animate-spin h-8 w-8 text-purple-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default PreviewSectionSkeleton;
