import asyncio
import dis

async def say_hello():
    print("Hello")
    await asyncio.sleep(1)   # non-blocking delay
    print("World")


async def greet(name):
    await asyncio.sleep(1)
    print(f"Hi {name}")

async def greet_all():
    await asyncio.gather(
        greet("Alice"),
        greet("Bob"),
        greet("Charlie")
    )

async def many_hellos():
    await asyncio.gather(
        say_hello(),
        say_hello(),
        say_hello(),
    )


async def demo():
    await greet('rondo')
    


# Run it
# asyncio.run(say_hello())
# asyncio.run(greet_all())
# asyncio.run(greet('ron'))
asyncio.run(demo())

# Show the internals of the event loop with dis :
dis.dis(demo)