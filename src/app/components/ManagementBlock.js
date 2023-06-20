export default function ManagementBlock() {
  return (
    <>
      <div className="d-flex flex-row mb-2">
        <div className="p-3 w-50">
          <div class="d-flex flex-column mb-3">
            <div class="p-1">Flex item 1</div>
            <div class="p-1">Flex item 2</div>
            <div class="p-1">Flex item 3</div>
          </div>
        </div>
        <div className="p-3 w-50">
          <div class="p-1">Flex item 1<button>View Card</button></div>
          <div class="p-1">Flex item 2</div>
          <div class="p-1">Flex item 3</div>
          <div class="p-1">
            <p>
              <span>appointments.</span>
              <span>appointments.</span>
            </p>
            <p><button>Save Data</button></p>
          </div>
        </div>
      </div>
    </>
  );
}
