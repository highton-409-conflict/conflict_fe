import { createRoot } from "react-dom/client"
import { Providers } from "@/app/Providers"
import { router } from "@/app/router"
import { queryClient } from "@/shared/query"

import "./global.css"

createRoot(document.getElementById("root")!).render(<Providers router={router} client={queryClient} />)
