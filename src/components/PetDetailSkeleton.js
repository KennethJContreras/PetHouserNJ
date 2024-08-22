export default function PetDetailSkeleton() {
    return (<div class="flex w-3/5 h-96 mx-auto overflow-hidden bg-white rounded-lg shadow-lg animate-pulse bg-gray-300">
        <div class="w-1/3 bg-gray-300 bg-gray-400"></div>
    
        <div class="w-2/3 p-4 md:p-4">
            <h1 class="w-40 h-2 bg-gray-200 rounded-lg bg-gray-200"></h1>
    
            <p class="w-full mb-5 h-2 mt-4 bg-gray-200 rounded-lg bg-gray-200"></p>
            <p class="w-full h-2 mt-4 bg-gray-200 rounded-lg bg-gray-200"></p>
            <p class="w-full h-2 mt-4 bg-gray-200 rounded-lg bg-gray-200"></p>
            <p class="w-full h-2 mt-4 bg-gray-200 rounded-lg bg-gray-200"></p>
            <p class="w-full h-2 mt-4 bg-gray-200 rounded-lg bg-gray-200"></p>
            <p class="w-full h-2 mt-4 bg-gray-200 rounded-lg bg-gray-200"></p>

            <div class="flex mt-4 item-center gap-x-2">
                <p class="w-5 h-2 bg-gray-200 rounded-lg bg-gray-200"></p>
                <p class="w-5 h-2 bg-gray-200 rounded-lg bg-gray-200"></p>
                <p class="w-5 h-2 bg-gray-200 rounded-lg bg-gray-200"></p>
                <p class="w-5 h-2 bg-gray-200 rounded-lg bg-gray-200"></p>
                <p class="w-5 h-2 bg-gray-200 rounded-lg bg-gray-200"></p>
                
            </div>
    
            <div class="flex justify-between mt-6 item-center">
                <h1 class="w-10 h-2 bg-gray-200 rounded-lg bg-gray-200"></h1>
    
                <div class="h-4 bg-gray-200 rounded-lg w-28 bg-gray-200"></div>
            </div>
        </div>
    </div>)
}
