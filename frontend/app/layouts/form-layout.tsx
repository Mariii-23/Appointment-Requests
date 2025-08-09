import React, { forwardRef } from "react";

interface FormLayoutProps extends React.FormHTMLAttributes<HTMLFormElement> {
    title?: string;
    children: React.ReactNode;
}

const FormLayout = forwardRef<HTMLFormElement, FormLayoutProps>(
    ({ title, children, ...formProps }, ref) => {
        return (
            <div className="p-4">
                {title && <h1 className="text-center mb-6">{title}</h1>}
                <form
                    ref={ref}
                    {...formProps}
                    className={`w-full max-w-md mx-auto space-y-6 ${formProps.className ?? ""}`}
                >
                    {children}
                </form>
            </div>
        );
    },
);

FormLayout.displayName = "FormLayout";

export default FormLayout;
