import { useMemo } from "react";
import { Users, UserCheck, UserMinus, UserX } from "lucide-react";
import StatCard from "./StatCard";
import { STATUS_CONFIG, USER_STATUS } from "@/constants";
import { Skeleton } from "@/components/ui/skeleton";

function StatsSection({ stats, isLoading }) {
  const dashboardStats = useMemo(
    () => [
      {
        title: "Total Users",
        value: stats.total,
        icon: <Users className="h-6 w-6 text-green-500" />,
      },
      {
        title: `${STATUS_CONFIG[USER_STATUS.ACTIVE].label} Users`,
        value: `${stats.activePercent}%`,
        icon: <UserCheck className="h-6 w-6 text-green-500" />,
      },
      {
        title: `${STATUS_CONFIG[USER_STATUS.INVITED].label} Users`,
        value: `${stats.invitedPercent}%`,
        icon: <UserMinus className="h-6 w-6 text-green-500" />,
      },
      {
        title: `${STATUS_CONFIG[USER_STATUS.BLOCKED].label} Users`,
        value: `${stats.blockedPercent}%`,
        icon: <UserX className="h-6 w-6 text-green-500" />,
        showLink: false,
      },
    ],
    [stats]
  );

  if (isLoading) {
    return (
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        {[1, 2, 3, 4].map((index) => (
          <StatCard key={index} isLoading={true} />
        ))}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
      {dashboardStats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          isLoading={isLoading}
          showLink={stat.showLink !== undefined ? stat.showLink : true}
        />
      ))}
    </section>
  );
}

export default StatsSection;
