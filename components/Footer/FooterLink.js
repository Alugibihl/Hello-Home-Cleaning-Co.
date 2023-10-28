import Link from "next/link";

export default function FooterLink({ label, link }) {
  return (
    <li className="m-r-10">
      <Link href={link}>{label}</Link>
    </li>
  );
}
