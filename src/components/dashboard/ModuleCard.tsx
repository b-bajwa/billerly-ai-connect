
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  className?: string;
  implemented?: boolean;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon,
  path,
  className,
  implemented = true,
}) => {
  return (
    <Card className={cn("h-full transition-all hover:shadow-md", className)}>
      <CardHeader className="p-4 flex flex-row items-center gap-3">
        <div className="bg-billerly-extralight text-billerly-primary p-2 rounded-lg">
          {icon}
        </div>
        <h3 className="font-medium">{title}</h3>
      </CardHeader>
      <CardContent className="px-4 py-2 text-sm text-muted-foreground">
        <p>{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-2">
        <Button asChild className="w-full" variant={implemented ? "default" : "outline"}>
          <Link to={path}>
            {implemented ? "Access Module" : "Coming Soon"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModuleCard;
