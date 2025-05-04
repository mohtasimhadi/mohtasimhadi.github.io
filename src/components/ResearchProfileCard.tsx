import Image from "next/image";

interface ProfileProps {
    platform: string;
    url: string;
    logo: string;
  }

const ProfileCard: React.FC<ProfileProps> = ({
    platform,
    url,
    logo,
  }) => {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center p-4 bg-white shadow-md rounded-lg border-l-4 border-[#E87722] transition hover:shadow-lg hover:bg-gray-50"
      >
        <Image
          src={logo}
          alt={`${platform} Logo`}
          width={48}
          height={48}
          className="mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{platform}</h3>
          <p className="text-sm text-gray-600">View Profile</p>
        </div>
      </a>
    );
  }
  
const ResearchProfiles = ({}) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
        <ProfileCard
          platform="Google Scholar"
          url="https://scholar.google.com/citations?user=ih7NQy8AAAAJ&hl=en"
          logo="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Scholar_logo.svg"
        />
        <ProfileCard
          platform="ResearchGate"
          url="https://www.researchgate.net/profile/Mohtasim-Rafi"
          logo="https://upload.wikimedia.org/wikipedia/commons/5/5e/ResearchGate_icon_SVG.svg"
        />
      </div>
    );
  }
  
export default ResearchProfiles;