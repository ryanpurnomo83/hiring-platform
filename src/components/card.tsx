import CheckMail from "../../public/Check-Mail.png";

export default function Card(){
    return(
        <>
        <div>
            <h2>Periksa Email Anda</h2>
            <p>Kami sudah mengirimkan link login ke <b>dityo@rakamin.com</b> yang berlaku dalam 30 menit</p>
            <img src={CheckMail}/>
        </div>
        </>
    );
}