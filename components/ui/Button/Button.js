/** @format */

export default function Button(props) {
   return (
      <button
         type="submit"
         style={{
            border: 0,
            backgroundColor: '#ee6c4d',
            color: 'white',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
         }}
      >
         {props.children}
      </button>
   );
}
