export default function DoctorAvatar({ doctor, size = "md" }) {
  const sizeClasses = {
    sm: "w-10 h-10 text-sm",
    md: "w-16 h-16 text-xl",
    lg: "w-24 h-24 text-3xl",
  };

  const initials = doctor?.name
    ? doctor.name
        .split(" ")
        .map((namePart) => namePart[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "DR";

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold overflow-hidden`}
    >
      {doctor?.image ? (
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover"
        />
      ) : (
        initials
      )}
    </div>
  );
}