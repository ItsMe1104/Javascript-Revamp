//? 1) Why JS was needed?
// --> HTML and CSS are not programming languages hence cannot perform logical and mathematical tasks
// --> HTML helps us to make static websites but with negligible interaction
// --> CSS makes that static website beautiful but still negligible interaction
// --> JS is considered as the brain of the websites to make interaction possible making them dynamic in nature


//?? 2) Browser and JS :-
// --> Browser understands JS because it has a software called the JS engine
// --> Inspect a website using right click and go to console
// --> Here we can execute JS


//?? 3) Why JS was introduced and C++ was not used:-
// --> In 1995, JS was introduced

//**** REASON 1 ******/
// --> At that time, very less C++ or Java developers were available due to the language's complexity
// --> JS on the other hand was very forgiving

//**** REASON 2 ******/
// --> Moreover C++ was a low level language, which could directly access or control our memory
// --> Hence, if we had run C++ code in our Browser (client) sent by the server it could have accessed our system files directly using system calls
// --> C++ can even overwrite OS/kernel memory using its pointers
// --> Making it a security issue

//**** REASON 3 ******/
// --> During 1995, Ram and secondary storage was very less
// --> That time including C++ compilers other than OS, Browser in the RAM memory was a memory consuming task

//**** REASON 4 ******/
// --> In C++, we had to free the memory manually
// --> In JS we got a garbage collector, which could release unused reserved memory automatically


//*** BENEFITS OF JS *****/
// a) Easy to use and learn
// b) A language that cannot directly access the User's system without permission
// --> It can have only restricted access of HTML/CSS/ some hardware events from keyboard, mouse and not of the OS and memory
// c) Light weight and less setup required
// d) Automatic Memory Management (Garbage Collection)


//?? 4) How the JS runs in Browser?

// --> Every Browser has a JS engine
// --> This JS engine is responsible for executing the JS language