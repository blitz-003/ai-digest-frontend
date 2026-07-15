"use client";


import {
 Editor
} from "@tiptap/react";


import {
 Button
} from "@/components/ui/button";



interface Props {

 editor:Editor;

}



export default function EditorToolbar({
 editor
}:Props){


return (

<div
className="
flex
flex-wrap
gap-2
border-b
p-3
"
>


<Button

type="button"

variant="outline"

size="sm"

onClick={()=>


editor.chain()
.focus()
.toggleBold()
.run()


}

>

Bold

</Button>




<Button

type="button"

variant="outline"

size="sm"

onClick={()=>


editor.chain()
.focus()
.toggleItalic()
.run()


}

>

Italic

</Button>





<Button

type="button"

variant="outline"

size="sm"

onClick={()=>


editor.chain()
.focus()
.toggleHeading({
level:1
})
.run()


}

>

H1

</Button>





<Button

type="button"

variant="outline"

size="sm"

onClick={()=>


editor.chain()
.focus()
.toggleHeading({
level:2
})
.run()


}

>

H2

</Button>





<Button

type="button"

variant="outline"

size="sm"

onClick={()=>


editor.chain()
.focus()
.toggleBulletList()
.run()


}

>

Bullet

</Button>





<Button

type="button"

variant="outline"

size="sm"

onClick={()=>


editor.chain()
.focus()
.toggleOrderedList()
.run()


}

>

Number

</Button>





<Button

type="button"

variant="outline"

size="sm"

onClick={()=>


editor.chain()
.focus()
.toggleBlockquote()
.run()


}

>

Quote

</Button>






<Button

type="button"

variant="outline"

size="sm"

onClick={()=>


editor.chain()
.focus()
.toggleCodeBlock()
.run()


}

>

Code

</Button>





<Button

type="button"

variant="outline"

size="sm"

onClick={()=>


editor.chain()
.focus()
.undo()
.run()


}

>

Undo

</Button>





<Button

type="button"

variant="outline"

size="sm"

onClick={()=>


editor.chain()
.focus()
.redo()
.run()


}

>

Redo

</Button>



</div>

);

}