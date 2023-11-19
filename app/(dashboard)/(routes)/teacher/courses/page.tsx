import { Button } from "@/components/ui/button";
import Link from "next/link"
const CoursePage = () => {
    return ( <div>
        <Link href="/teacher/create">
        <Button>
            New COurse
        </Button>
        Course Page!
        </Link>
    </div> );
}
 
export default CoursePage;