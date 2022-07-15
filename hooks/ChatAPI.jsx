function useFriendStatus(friendID){
    const [isOnline,setIsOnline]=useState(null)
    function handleStatusChange(status){
        setIsOnline(status.isOnline)
    }
    useEffect(()=>{
        ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange)
        return ()=>{
            ChatAPI.unsubscribeToFriendStatus(friendID, handleStatusChange)

        }
        // 性能优化，仅在传递的第二个可选参数（数组）中的值发生变化时，执行effect函数
    },[props.friend.id])
    return isOnline
}
function FriendStatus(props){
    const isOnline =useFriendStatus(props.friend.id)
    if(isOnline===null){
        return 'Loading...'
    }
    return isOnline?'Online':'Offline'
}
function FriendListItem(props){
    const isOnline=useFriendStatus(props.friend.id)
    return (
        <li style={{ color: isOnline ? 'green' : 'black' }}>
            {props.friend.name}
        </li>
    )
}
const friendList=[
    {id:1,name:'安安'},
    {id:2,name:'泡泡'},
    {id:3,name:'乐乐'}
]
function ChatRecipientPicker(){
    const [recipientID,setRecipientID]=useState(1)
    const isRecipientOnline=useFriendStatus(recipientID)
    return (
        <>
        <Circle color={isRecipientOnline?'green':'red'}/>
        <select
        value={recipientID}
        onChange={e=>setRecipientID(Number(e.target.value))}
        >
         {friendList.map(friend=>{
            <option key={friend.id} value={friend.id}>
                {friend.name}
            </option>
         })}
        </select>
        </>
    )
}