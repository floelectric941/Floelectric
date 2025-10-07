import Link from 'next/link';
export default function ThankYou() {
  return (
    <div style={{minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', background:'#000', color:'#fff', padding:24}}>
      <img src="https://files.oaiusercontent.com/file_00000000246861f7ab2cca2e185b173c" alt="Flo Electric" style={{height:96}} />
      <h1 style={{fontSize:32, marginTop:18}}>Thank you!</h1>
      <p style={{color:'#9ca3af', maxWidth:640, textAlign:'center'}}>Your message has been sent. We’ll be in touch shortly.</p>
      <a href="/" style={{marginTop:20, background:'#fbbf24', color:'#000', padding:'10px 14px', borderRadius:8}}>Return to Home</a>
    </div>
  )
}
