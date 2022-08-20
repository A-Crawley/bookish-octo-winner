export default function Guest({ guestId }){
    
    
    return(
        <p style={{
            position: 'absolute',
            right: '10px',
            top: 0,
            fontSize: '0.6em',
            color: 'rgba(0,0,0,0.5)',
            zIndex: 9999
          }}>GUEST: {guestId}</p>
    );
}