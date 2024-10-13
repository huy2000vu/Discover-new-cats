export default function Banlist({ bannedList, removeFromBanList }) {
  function handleClick(event) {
    const buttonName = event.target.textContent; // Get the name of the button
    removeFromBanList(buttonName); // Call the function passed from the parent
    console.log(`removed: ${buttonName}`);
  }
  return (
    <div className="banned_list_main">
      <div className="bannedListTitle">Banned Attributes</div>
      {bannedList &&
        bannedList.map((attr, index) => (
          <div className="bannedAttributes">
            <button onClick={handleClick} className="attributes">
              {attr}
            </button>
          </div>
        ))}
    </div>
  );
}
