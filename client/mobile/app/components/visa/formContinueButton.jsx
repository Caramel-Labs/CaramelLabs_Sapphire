export default function FormContinueButton(props) {
  return (
    <button
      className="w-[329px] h-[48px] bg-teal-500 text-white text-[12px] py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors duration-300"
      onClick={props.onHandleNext}
    >
      Continue
    </button>
  );
}
