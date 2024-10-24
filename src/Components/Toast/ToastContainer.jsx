import Toast from "./Toast";

function ToastContainer({ toasts }) {
  return (
    <div className="toasts-container mx-auto w-fit max-w-fit md:max-w-full fixed top-0 left-0 right-0 z-[100]">
      <div className="flex flex-col items-center justify-center space-y-2 p-4">
        {toasts?.map((toast) => {
          return <Toast key={toast.id} {...toast} />;
        })}
      </div>
    </div>
  );
}
export default ToastContainer;
