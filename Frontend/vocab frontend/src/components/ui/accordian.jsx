// "use client";

// import * as React from "react";
// import * as AccordionPrimitive from "@radix-ui/react-accordion";
// import { ChevronDown } from "lucide-react";

// import { cn } from "@/lib/utils";

// const Accordion = AccordionPrimitive.Root;

// const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
//     <AccordionPrimitive.Item
//         ref={ref}
//         className={cn("border-b", className)}
//         {...props}
//     />
// ));
// AccordionItem.displayName = "AccordionItem";

// const AccordionTrigger = React.forwardRef(
//     ({ className, children, ...props }, ref) => (
//         <AccordionPrimitive.Header className="flex">
//             <AccordionPrimitive.Trigger
//                 ref={ref}
//                 className={cn(
//                     "flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180",
//                     className
//                 )}
//                 {...props}
//             >
//                 {children}
//                 <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
//             </AccordionPrimitive.Trigger>
//         </AccordionPrimitive.Header>
//     )
// );
// AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

// const AccordionContent = React.forwardRef(
//     ({ className, children, ...props }, ref) => (
//         <AccordionPrimitive.Content
//             ref={ref}
//             className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
//             {...props}
//         >
//             <div className={cn("pb-4 pt-0", className)}>{children}</div>
//         </AccordionPrimitive.Content>
//     )
// );

// AccordionContent.displayName = AccordionPrimitive.Content.displayName;

// export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };


// src/components/Accordion.tsx
// src/components/Accordion.jsx

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@heroicons/react/solid'; // Optional for the icon

const Accordion = ({ items }) => {
    return (
        <AccordionPrimitive.Root type="single" collapsible className="w-full">
            {items.map((item) => (
                <AccordionPrimitive.Item key={item.id} value={item.id} className="border-b">
                    <AccordionPrimitive.Header>
                        <AccordionPrimitive.Trigger>
                            {item.header}
                            <ChevronDownIcon className="ml-2 h-5 w-5  text-gray-900" />
                        </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>
                    <AccordionPrimitive.Content className="p-4 text-gray-700">
                        {item.content}
                    </AccordionPrimitive.Content>
                </AccordionPrimitive.Item>
            ))}
        </AccordionPrimitive.Root>
    );
};

export default Accordion;
