import { Link, useMatches } from "react-router-dom";
function Breadcrumbs() {
  let matches = useMatches();
  let crumbs = matches
    .filter((match) => Boolean(match.pathname))
    .map((match) => match.pathname.split("/").filter((crumb) => crumb));
  return (
    <div className="bg-white w-full max-w-fit p-2">
      <ul className=" flex text-lg text-[#2E4053] place-items-center items-center">
        <Link
          to={"/"}
          className=" cursor-pointer hover:bg-[#E8DAEF] p-4 rounded-md"
        >
          Home
        </Link>
        <img src={"/img/forward.png"} className="w-5 h-5 " alt="" />
        {crumbs.map((crumb, index) => (
          <li key={index}>{crumb}</li>
        ))}
      </ul>
    </div>
  );
}
export default Breadcrumbs;
